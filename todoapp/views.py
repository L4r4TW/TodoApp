from django.shortcuts import render
from .models import Todo
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404

# Create your views here.
@login_required(login_url="loginPage")
def index(request):
    # user = request.user
    # print(user)
    # todos = Todo.objects.filter(user=user)
    # # todos = Todo.objects.all()
    # for todo in todos:
    #     print(todo.name)
    return render(request, 'index.html', {'username': request.user.username.capitalize()})

@login_required(login_url="loginPage")
def create_todo(request):
    profile = request.user
    if request.method == 'POST':
        print(profile)
        data = json.loads(request.body)
        todo_name = data['name']
        todo = Todo.objects.create(name=todo_name)
        todo.user = profile
        todo.save()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})
    
@login_required(login_url="loginPage")    
def delete_todo(request):
    if request.method == 'POST':
        print('kurva anyad')
        data = json.loads(request.body)
        name = data['name']
        # name = request.POST.get('name')
        print(name)
        Todo.objects.filter(name=name).delete()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})

@login_required(login_url="loginPage")    
def get_todos(request):
    user = request.user
    print(user)
    todos = Todo.objects.filter(user=user)
    # todos = Todo.objects.all()
    todo_list = [{'name': todo.name, 'completed': todo.completed} for todo in todos]
    return JsonResponse(todo_list, safe=False)

@login_required(login_url="loginPage")    
def complete_todo(request):
    if request.method == 'POST':
        print('complete_todo function running')
        data = json.loads(request.body)
        name = data['name']
        print(name)
        my_object = get_object_or_404(Todo, name=name)
        print(f'befor if {my_object.completed}')

        if my_object.completed == False:
            my_object.completed = True
            my_object.save()
        else:
            my_object.completed = False
            my_object.save()

        print(my_object.completed)
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})