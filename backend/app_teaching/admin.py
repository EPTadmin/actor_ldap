from django.contrib import admin
from .models import *
from .forms import *
#from .views import personcourse
from django import forms
from django.db.models import Value
from django.db.models.functions import Concat
from django.utils.html import format_html
from django.utils.safestring import mark_safe
import pandas as pd
# Register your models here.




class CourseAdmin(admin.ModelAdmin):

    list_display = [field.name for field in Course._meta.get_fields() if ((field.name != 'personcourse') and (field.name != 'id') and (field.name !='courses') and (field.name != 'course_amount')) ]
    list_filter_links = ('course_id','name') 
    list_filter = ("type","group", )
    list_display.append("SP")

    @admin.display(description='SP')

    def SP(self, obj):
        #studiepoeng=[float(a.course.studiepoeng.replace(',','.')) for a in  PersonCourse.objects.filter(course__type='O1')]
        #studiepoeng=PersonCourse.objects.filter(course__id = obj.id).filter(course__type ='O1')
        studiepoeng=[float(a.course.studiepoeng.replace(',','.')) for a in  PersonCourse.objects.filter(course__id = obj.id).exclude(course__type='PH').exclude(course__type='FP').exclude(course__type='MS')]
    
        stud=[float(a.course.nb_student) for a in  PersonCourse.objects.filter(course__id = obj.id).exclude(course__type='PH')]

        for a in range(0,len(studiepoeng)):
            return studiepoeng[0]*stud[0]/60


    
    form = CourseAdminForm

    

class PersonAdmin(admin.ModelAdmin):

    list_display = [field.name for field in Person._meta.get_fields() if ((field.name != 'personcourse')and (field.name != 'personactivity') and(field.name != 'id') and (field.name != 'middle_name')and (field.name != 'person_amount')) ][:-2]
    print(list_display)
    list_filter = ("groupe", )
    list_display_links = ('first_name', 'last_name')

    form = CourseAdminForm


    list_display.append("assigned_amount_O1")
    list_display.append("assigned_amount_O2")
    list_display.append("assigned_Belast_Tid")
    list_display.append("assigned_Belast_fde")
    list_display.append("assigned_pourcent_75")
    list_display.append("assigned_student")
    list_display.append("assigned_Belast_fdeb")
    list_display.append("assigned_student_msc")
    list_display.append("assigned_Belast_msc")
    list_display.append("assigned_Belast_phd")
    list_display.append("Timer_posisjoner")
    list_display.append("Timer_prosjekt")

    # list_display.append("position_activity")


    @admin.display(description='Amount_O1')
    def assigned_amount_O1(self, obj):
        a=[a for a in  PersonCourse.objects.filter(person__id = obj.id)]
        return round(sum([(a.amount)/100*280 for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='O1')]))
    
    @admin.display(description='Amount_O2')
    def assigned_amount_O2(self, obj):
        return round(sum([(a.amount)/100*252 for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='O2')]))
    
    @admin.display(description='Belast_Tid_7.5')
    def assigned_Belast_Tid(self, obj):
        a=[(a.amount)/100*280 for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='O1')]
        b=[(a.amount)/100*252 for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='O2')]
        c=sum(pa for pa in a)+sum(pb for pb in b)
        return round(c)
    
    @admin.display(description='% 7.5')
    def assigned_pourcent_75(self, obj):
        a=[(a.amount)/100*280 for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='O1')]
        b=[(a.amount)/100*252 for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='O2')]
        c=sum(pa for pa in a)+sum(pb for pb in b)
        return round(c/250*100)       
    
    @admin.display(description='Belast_Tid_FDE')
    def assigned_Belast_fde(self, obj):
        a=[(a.amount) for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='FE')]
        b=[(float(a.course.studiepoeng.replace(',','.'))) for a in PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='FE')]
        c=sum(((pa))*((pb)) for pa, pb in zip(a,b))        
        return (c/(100*3.75)*125)
    
    @admin.display(description='Ant. Stud.')
    def assigned_student(self, obj):
        a=[float(a.amount) for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='FP')]
        return int(sum(pa for pa in a)) 
    
    @admin.display(description='Belast_Tid_FDEB')
    def assigned_Belast_fdeb(self, obj):
        timer  =timer_75=0
        studiepoeng=[float(a.course.studiepoeng.replace(',','.')) for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='FP')]
        print(studiepoeng)
        nb_stud = [float(a.amount) for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='FP')]
        print(a for a in nb_stud)
        print(b for b in studiepoeng)
        timer_75 = sum ((pa)* 30 for pa, pb in zip(nb_stud,studiepoeng) if pb==float(7.5)) 
        timer_15 = sum ((pa)* 40 for pa, pb in zip(nb_stud,studiepoeng) if pb==float(15)) 
        timer_20 = sum ((pa)* 50 for pa, pb in zip(nb_stud,studiepoeng) if pb==float(20)) 

        return (timer_75+timer_15+timer_20)
    
    @admin.display(description='Ant. Stud. MSc')
    def assigned_student_msc(self, obj):
        a=[float(a.amount) for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='MS')]
        return int(sum(pa for pa in a)) 
    
    @admin.display(description='Belast_Tid_MSC')
    def assigned_Belast_msc(self, obj):
        a=[(a.amount) for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='MS')]
        b=[(float(a.course.studiepoeng.replace(',','.'))) for a in PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='MS')]
        c=sum(((pa))*((pb)) for pa, pb in zip(a,b))        
        return int(c)
    
    @admin.display(description='Belast_Tid_PHD')
    def assigned_Belast_phd(self, obj):
        a=[1 for a in  PersonCourse.objects.filter(person__id = obj.id).filter(course__type ='PH') if a!=0]                
        return int(sum(pa*250 for pa in a))
    
    @admin.display(description='Timer_posisjoner')
    def Timer_posisjoner(self, obj):

        a=[((a.amount)*1750*0.8) for a in  PersonActivity.objects.filter(person__id = obj.id).filter(activity__arsverk ='80')]
        b=[((b.amount)*1750*0.3) for b in  PersonActivity.objects.filter(person__id = obj.id).filter(activity__arsverk ='30')]
        c=[((c.amount)*1750*0.2) for c in  PersonActivity.objects.filter(person__id = obj.id).filter(activity__arsverk ='20')]

        d=sum(pa for pa in a) + sum(pb for pb in b) +sum(pc for pc in c)
        return (d)
    
    @admin.display(description='Timer_prosjekt')
    def Timer_prosjekt(self, obj):
       

        a=[((a.amount)*50) for a in  PersonActivity.objects.filter(person__id = obj.id).filter(activity__antall_time ='50')]
        b=[((b.amount)*70) for b in  PersonActivity.objects.filter(person__id = obj.id).filter(activity__antall_time ='70')]
        c=[((c.amount)*100) for c in  PersonActivity.objects.filter(person__id = obj.id).filter(activity__antall_time ='100')]

        d=sum(pa for pa in a) + sum(pb for pb in b) +sum(pc for pc in c)
        return (d)   

class PersonCourseAdmin(admin.ModelAdmin):

    list_display = [field.name for field in PersonCourse._meta.get_fields() if (field.name != 'id')]
    list_filter = ("course", "person",  )

    form = CourseAdminForm



class Position_ActivityAdmin(admin.ModelAdmin):

    list_display = [field.name for field in Position_Activity._meta.get_fields() if ((field.name != 'personactivity') and (field.name != 'activities') and (field.name != 'id'))]
    list_filter_links = ('type') 

    print('activityactivity',list_display)
    form = CourseAdminForm

class PersonActivityAdmin(admin.ModelAdmin):

    list_display = [field.name for field in PersonActivity._meta.get_fields() if (field.name != 'id')]

    # print('activity',list_display)
    form = CourseAdminForm


admin.site.register(Course, CourseAdmin)
admin.site.register(Person,PersonAdmin)
admin.site.register(PersonCourse,PersonCourseAdmin)
admin.site.register(Position_Activity,Position_ActivityAdmin)
admin.site.register(PersonActivity,PersonActivityAdmin)
admin.site.register(User)

#admin.site.register(Position_Activity,Position_ActivityAdmin)

# admin.site.register(Ressource)