require 'test_helper'

class Web::DevelopersControllerTest < ActionController::TestCase
  test 'should ge new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    post :create, params: { developer: attributes_for(:developer) }
    assert_response :redirect
  end
end
