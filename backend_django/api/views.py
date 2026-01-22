from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from .utils import generate_jwt
import random
from django.contrib.auth.hashers import check_password
from django.db import transaction

class UserSignUp(APIView):
    def post(self, request):
        data = request.data
        if not data:
            return Response({"error": "Could not find data in the request"},status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UsersSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            
            # give random amount of money to new users in their Account
            value = random.randint(100,1000)
            account = Account.objects.create(user=user, balance=value)
            account.save()
            
            # generating token
            token = generate_jwt(user)
            
            return Response(
                {
                    "message": "User registered successfully",
                    "token": token,
                    "Account_id": account.id,
                    "Balance" : account.balance,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                    },
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            
class UserSignIn(APIView):
    
    def post(self, request):
        username = request.data.get('username')
        password =  request.data.get('password')

        if not username or not password:
            return Response({"error": "Username or Password can't be null!!"},status=status.HTTP_400_BAD_REQUEST)
        
        user = Users.objects.get(username=username)
        if not user:
            return Response({"error": "Could not find User with this Usernane"},status=status.HTTP_404_NOT_FOUND)
        
        # now checking password
        check = check_password(password, user.password)
        if check:
            
            # generating token
            token = generate_jwt(user)
            if not token:
                return Response({"error": "Could not generate token"},status=status.HTTP_400_BAD_REQUEST)
            
            return Response({
                    "token": token,
                    "user_id": user.id,
                },status=status.HTTP_200_OK)
        
        return Response({"Incorrect Password with this Username!!"},status=status.HTTP_400_BAD_REQUEST)
        
        
class EditProfileView(APIView):
    
    def put(self, request):
        id = request.user_id
        if not id:
            return Response({"error": "Could not find ID in the request"},status=status.HTTP_400_BAD_REQUEST)
        
        user = Users.objects.get(id=id)
        if not user:
            return Response({"error": "Could not find user with this ID"},status=status.HTTP_404_NOT_FOUND)
        
        serializer = UsersSerializer(user, data = request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class FetchUserBulk(APIView):
    
    def get(sef, request):
        
        filter_name = request.GET.get('name')
        users = Users.objects.filter(first_name__icontains=filter_name) or Users.objects.filter(last_name__icontains=filter_name)
        if not users:
            return Response({"error": "Could not find Users with this Sub string"},status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


class CheckBalanceView(APIView):
    
    def get(self, request):
        user_id = request.user_id
        if not  user_id:
            return Response({"error": "Could not get user id from middleware"},status=status.HTTP_404_NOT_FOUND)
        
        account = Account.objects.get(user_id=user_id)
        if not account:
            return Response({"error": "Could not find Account with this User id"},status=status.HTTP_404_NOT_FOUND)
        
        return Response({"balance": account.balance},status=status.HTTP_200_OK)
    
    
class BalanceTransferView(APIView):
    
    def post(self, request):
        sender_id = request.user_id
        receiver_id = request.data.get('receiver_id')
        amount =  int(request.data.get('amount'))
        
        # check all data is avaliable or not
        if not all([sender_id, receiver_id, amount]):
            return Response({"error": "Sender and Receiver Id and Amount must be there!!"},status=status.HTTP_400_BAD_REQUEST)
        
        # checking all accounts 
        sender_account =  Account.objects.get(user_id=sender_id)
        receiver_account  = Account.objects.get(user_id=receiver_id)
        
        if not sender_account or not receiver_account:
            return Response({"error": "Sender or Receiver is not having account"},status=status.HTTP_400_BAD_REQUEST)
        
        
        try:
            with transaction.atomic():
                
                # check sender balance is enough to make the transaction   
                if sender_account.balance <  amount:
                    return Response({"Insuffient Balance"},status=status.HTTP_400_BAD_REQUEST)

                # deducting amount from sender account
                sender_account.balance = sender_account.balance - amount
                sender_account.save()
                
                # increasing / adding amount in receiver account
                receiver_account.balance =  receiver_account.balance + amount
                receiver_account.save()
                
                return  Response({"message": "Transaction Completed successfully"},status=status.HTTP_200_OK)
            
        except Exception as e:
                 return  Response({"error": f"Got error with  transfering amount {e}"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    
class BalanceTransferView(APIView):

    def post(self, request):

        sender_id = request.user_id
        receiver_id = request.data.get("receiver_id")

        try:
            amount = int(request.data.get("amount"))
        except:
            return Response({"error": "Invalid amount"}, status=400)

        if not all([sender_id, receiver_id, amount]):
            return Response(
                {"error": "Sender, Receiver and Amount are required"},
                status=400
            )

        if amount <= 0:
            return Response({"error": "Amount must be greater than zero"}, status=400)

        try:
            with transaction.atomic():

                sender_account = Account.objects.select_for_update().get(user_id=sender_id)
                receiver_account = Account.objects.select_for_update().get(user_id=receiver_id)

                if sender_account.balance < amount:
                    return Response({"error": "Insufficient balance"}, status=400)

                sender_account.balance -= amount
                receiver_account.balance += amount

                sender_account.save()
                receiver_account.save()

                Transaction.objects.create(
                    sender_id=sender_account.id,
                    receiver_id=receiver_account.id,
                    amount=amount,
                    status="SUCCESS"
                )

            return Response(
                {"message": "Transaction completed successfully"},
                status=status.HTTP_200_OK
            )

        except Account.DoesNotExist:
            return Response(
                {"error": "Sender or Receiver account not found"},
                status=404
            )

        except Exception as e:
            return Response(
                {"error": f"Transfer failed: {str(e)}"},
                status=500
            )