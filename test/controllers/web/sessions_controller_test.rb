require 'test_helper'

class Web::SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'should get new' do
    get new_session_path
    assert_response :success
  end

  test 'should post create' do
    password = generate(:string)
    user = create(:user, { password: password })
    attrs = {
      email: user.email,
      password: password,
    }
    post session_path, params: { session_form: attrs }
    assert_response :redirect
  end

  test 'should define destroy' do
    delete session_path
    assert_response :redirect
  end
end
