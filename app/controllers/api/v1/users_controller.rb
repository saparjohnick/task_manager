class Api::V1::UsersController < ApplicationController
  def show
    user = User.find(params[:id])

    respond_with(user, serializer: UserSerializer)
  end

  def index
    users = User.ransack(ransack_params).result.page(page).per_page(per_page)

    respond_with(users, each_serializer: UserSerializer, meta: build_meta(users), root: 'items')
  end
end
