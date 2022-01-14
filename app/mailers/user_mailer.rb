class UserMailer < ApplicationMailer
  default from: 'info@taskmanager.com'

  def task_created
    user = params[:user]
    @task = params[:task]

    mail(from: 'noreply@taskmanager.com', to: user.email, subject: 'New Task Created')
  end

  def task_updated
    user = params[:user]
    @task = params[:task]

    mail(from: 'noreply@taskmanager.com', to: user.email, subject: 'New Task Updated')
  end

  def task_deleted
    user = params[:user]
    @task = params[:task]

    mail(from: 'noreply@taskmanager.com', to: user.email, subject: 'New Task Deleted')
  end

  def forgot_password(user)
    @user = user
    @greeting = "Hi"
    
    mail(to: user.email, subject: 'Reset password instructions')
  end
end
