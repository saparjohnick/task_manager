class Admin::ApplicationController < ApplicationController
  include AuthHelper

  before_action :authenticate_user!, :authorize

  def authorize
    render(file: File.json(Rails.root, 'public/403.html'), status: 403, layout: false) if forbidden?
  end

  def forbidden?
    !current_user.is_a?(Admin)
  end
end
