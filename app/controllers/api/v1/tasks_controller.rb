class Api::V1::TasksController < Api::V1::ApplicationController
  def index
    search = Task.includes(:author, :assignee).all.ransack(ransack_params)
    search.sorts = RANSACK_DEFAULT_SORT
    tasks = search.
      result.
      page(page).
      per(per_page)

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

  def update
    task = Task.find(params[:id])
    task.update(task_params)

    respond_with(task, serializer: TaskSerializer)
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy

    respond_with(task)
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :assignee_id, :author_id, :state_event, :expired_at)
  end
end
