from django.contrib import admin
from .models import User, ProfileDetails,LocalSpecies
from .models import Species,NotFoundLog, OTP, Rewards
# Register your models here.


admin.site.register(User)
admin.site.register(ProfileDetails)
admin.site.register(Species)
admin.site.register(NotFoundLog)
admin.site.register(OTP)
admin.site.register(Rewards)
admin.site.register(LocalSpecies)