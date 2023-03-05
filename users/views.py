from django.shortcuts import render
from django.http import JsonResponse
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# Create your views here.
def loginPage(request):
    
    return render(request, 'login.html')

def loginUser(request):
    print('kurvaanyad')   

    if request.method == 'POST':
        # Parse the JSON string into a Python dictionary
        data = json.loads(request.body)

        # Get the username and password from the dictionary
        username = data['username']
        password = data['password']
        
        print(f'Username: {username}, Password: {password}')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Username and password are correct, do something
            login(request, user)
            return JsonResponse({'success': True})
        else:
            # Username and password are incorrect
            return JsonResponse({'success': False, 'message': 'Invalid username or password'})

    return JsonResponse({'success': False})

def logoutUser(request):
    logout(request)
    return JsonResponse({'success': True})

def registerPage(request):
    
    return render(request, 'register.html')

def registerUser(request):
    if request.method == 'POST':
        # Load the JSON data from the request body
        json_data = json.loads(request.body)
        print(json_data)

        username = json_data['username']
        password = json_data['password']

        print('kurvaanyad!')
        # user = User.objects.get(username='myusername')
        user = User.objects.create(username=username)

        # Change the user's password
        user.set_password(password)
        user.save()

        user = authenticate(request, username=username, password=password)
        login(request, user)
        # Return a JSON response with the user ID and username
        response_data = {'success': True, 'user_id': user.id, 'username': user.username}
        return JsonResponse(response_data)
   
    else:
        # Return a 405 Method Not Allowed response for all other HTTP methods
        return JsonResponse({'error': 'Method not allowed'}, status=405)
