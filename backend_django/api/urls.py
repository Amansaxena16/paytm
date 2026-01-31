# api/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    # Auth SignUp and SignIn views
    path('user/signup/', UserSignUp.as_view(), name='user_signun'),
    path('user/signin/', UserSignIn.as_view(), name='user_signin'),

    # Edit User Data
    path('edit/profile/', EditProfileView.as_view(), name='user_edit_profile'),
    
    # Fetch Users based on User filter query
    path('fetch/user-bulk/', FetchUserBulk.as_view(), name='fetch_users_in_bulk'),
    
    # check balance
    path('check/balance/', CheckBalanceView.as_view(), name='check_balance'),
    path('balance/transfer/', BalanceTransferView.as_view(), name='transfer_money_btw_two_users'),
    
    # Fetch Dashboard Data
    path('get/dashbaord/data/', GetUserDashboardData.as_view(), name='get_user_dashboard_data'),
]