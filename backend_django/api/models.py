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
        return self.balance
    
class Transaction(models.Model):
    STATUS = [
        ('SUCCESS', 'SUCCESS'),
        ('INCOMPLETE', 'INCOMPLETE'),
        ('FAILED', 'FAILED')
    ]
    
    sender_id = models.UUIDField(null=True, blank=True)
    receiver_id = models.UUIDField(null=True, blank=False)
    status = models.CharField(choices=STATUS, null=True, blank=True)
    amount = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return self.sender_id, self.receiver_id, self.status, self.amount