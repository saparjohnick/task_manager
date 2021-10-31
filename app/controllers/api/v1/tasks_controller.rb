class TasksController < Api::V1::ApplicationController
  def index 
    task = Task.all
               .ransack(ransack_params)
               .result
               .page(page)
               .per(per_page)

    respond_with(tasks, each_serializer: TaskSerializer, root: 'items', meta: build_meta(tasks))
  end
end
