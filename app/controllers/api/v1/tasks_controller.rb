class TasksController < Api::V1::ApplicationController
  def index 
    task = Task.all
               .ransack(ransack_params)
               .result
               .page(page)
               .per(per_page)

    respond_with(tasks, each_serializer: TaskSerializer, root: 'items', meta: build_meta(tasks))
  end

  def show
    task = Task.find(params[:id])
    respond_with(task, serializer: TaskSerializer)
  end
  
  def create
    task = current_user.my_tasks.new(task_params)
    task.save

    respond_with(task, serializer: TaskSerializer, location: nil)
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :assignee_id, :author_id, :state_event)
  end
end
