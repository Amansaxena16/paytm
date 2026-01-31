from django.db import models
import uuid
# Create your models here.
class  Users(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True,  editable=False)
    username = models.CharField(max_length=50, unique=True, null=False, blank=False)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name =models.CharField(max_length=50, null=True, blank=True)
    password = models.CharField(max_length=100, null=False, blank=False)
    created_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    def __str__(self):
        return self.username
    
    
class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    balance = models.IntegerField(null=True, blank=True)
    def __str__(self):
        return f"Account({self.user_id}) - Balance: {self.balance}"
    
class Transaction(models.Model):

    class Status(models.TextChoices):
        SUCCESS = "SUCCESS", "SUCCESS"
        INCOMPLETE = "INCOMPLETE", "INCOMPLETE"
        FAILED = "FAILED", "FAILED"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, blank=True)
    sender = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, related_name="debits")
    receiver = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, related_name="credits")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20,choices=Status.choices,default=Status.INCOMPLETE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} -> {self.receiver} | {self.amount} | {self.status}"
