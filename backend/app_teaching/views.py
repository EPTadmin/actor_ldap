from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from .models import Course,Person,PersonCourse,User
from .serializers import *
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth import login, logout
from  django.contrib.auth.middleware import get_user           
from rest_framework.views import APIView

# User = get_user_model()

# class RegisterViewset(viewsets.ViewSet):
#     permission_classes =[permissions.AllowAny]
#     queryset = User.objects.all()
#     serializer_class =RegisterSerializers

#     def create(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors, status=400)


# class LoginViewset(viewsets.ViewSet):
#     permission_classes=[permissions.AllowAny]
#     serializer_class = LoginSerializers

#     def create(self, request):
#         serializer = self.serializer_class(data=request.data)

        # if serializer.is_valid():
        #     username = serializer.validated_data['username']
        #     password = serializer.validated_data['password']

        #     user = authenticate(request, username=username, password=password)

        #     if user:
        #         _, token=AuthToken.objects.create(user)
        #         return Response(
        #             {
        #                 "user":self.serializer_class(user).data,
        #                 "token" : token
        #             }
        #         )
        #     else:
        #         return Response({"error":"invalid credentials"},status=401)
        # else:
        #     return Response(serializer.errors,status=400)


class CourseViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Course.objects.all()
    serializer_class = CourseSerializers

    def list(self, request):
        queryset = Course.objects.all()
        serializer = self.serializer_class(queryset,many = True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

    def retrieve(self, request, pk=None):
        course = self.queryset.get(pk=pk)
        serializer = self.serializer_class(course)
        return Response(serializer.data)


    def update(self, request, pk=None):
        course = self.queryset.get(pk=pk)
        serializer = self.serializer_class(course,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)


    def destroy(self, request, pk=None):
        course = self.queryset.get(pk=pk)
        course.delete()
        return Response(status=204)

class PersonViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Person.objects.all()
    serializer_class = PersonSerializers

    def list(self, request):
        queryset = Person.objects.all()
        serializer = self.serializer_class(queryset,many = True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

    def retrieve(self, request, pk=None):
        person = self.queryset.get(pk=pk)
        serializer = self.serializer_class(person)
        return Response(serializer.data)


    def update(self, request, pk=None):
        person = self.queryset.get(pk=pk)
        serializer = self.serializer_class(person,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)


    def destroy(self, request, pk=None):
        person = self.queryset.get(pk=pk)
        person.delete()
        return Response(status=204)
    
class PersonCourseViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = PersonCourse.objects.all()
    serializer_class = PersonCourseSerializers

    def list(self, request):
        queryset = PersonCourse.objects.all()
        serializer = self.serializer_class(queryset,many = True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

    def retrieve(self, request, pk=None):
        personcourse = self.queryset.get(pk=pk)
        serializer = self.serializer_class(personcourse)
        return Response(serializer.data)


    def partial_update(self, request, pk=None):
        personcourse = self.queryset.get(pk=pk)
        serializer = self.serializer_class(personcourse,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

class PersonActivityViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = PersonActivity.objects.all()
    serializer_class = PersonActivitySerializers

    def list(self, request):
        queryset = PersonActivity.objects.all()
        serializer = self.serializer_class(queryset,many = True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

    def retrieve(self, request, pk=None):
        personactivity = self.queryset.get(pk=pk)
        serializer = self.serializer_class(personactivity)
        return Response(serializer.data)


    def partial_update(self, request, pk=None):
        personactivity = self.queryset.get(pk=pk)
        serializer = self.serializer_class(personactivity,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

class PositionActivityViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Position_Activity.objects.all()
    serializer_class = PositionActivitySerializers

    def list(self, request):
        queryset = Position_Activity.objects.all()
        serializer = self.serializer_class(queryset,many = True)
        return Response(serializer.data)
    
# class PersonActivityViewset(viewsets.ViewSet):
#     permission_classes = [permissions.AllowAny]
#     queryset = PersonActivity.objects.all()
#     serializer_class = PersonActivitySerializers

#     def list(self, request):
#         queryset = PersonActivity.objects.all()
#         serializer = self.serializer_class(queryset,many = True)
#         return Response(serializer.data)
    

# Create your views here.
def home(request):
    return HttpResponse("This is the home page")

class LDAPLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        serializer = LoginSerializers(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user, backend="django_python3_ldap.auth.LDAPBackend")
            try:
                login_user = User.objects.get(username=user.username)
            except:
                login_user = User(user)
                login_user.save()
                
            return Response(UserSerializer(login_user).data, status=status.HTTP_200_OK)

class LDAPLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
class UserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        user = get_user(request) 
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)