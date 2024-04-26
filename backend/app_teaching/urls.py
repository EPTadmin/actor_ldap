from django.urls import path, include
from . import views
# from app_teaching.views import BootstrapFilterView
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('course',CourseViewset,basename = 'course')
router.register('person',PersonViewset,basename = 'person')
router.register('person_course',PersonCourseViewset,basename = 'person_course')
router.register('person_activity',PersonActivityViewset,basename = 'person_activity')
router.register('position_activity',PositionActivityViewset,basename = 'position_activity')
router.register('login',LoginViewset,basename = 'login')
router.register('register',RegisterViewset,basename = 'register')

# router.register('login',LoginViewset)

urlpatterns = [path('api/', include((router.urls, 'app_teaching'))),
               ]


