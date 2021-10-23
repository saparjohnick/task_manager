require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  def setup
    @task = create(:task)
  end
  test 'create' do
    assert @task.persisted?
  end

  test 'initial state should be :new_task' do
    assert_equal 'new_task', @task.state
  end

  test 'new task can be moved to :in_development' do
    @task.in_development
    assert_equal 'in_development', @task.state
  end

  test 'new task can be moved to :archived' do
    @task.archived
    assert_equal 'archived', @task.state
  end

  test ':in_development task can be moved to :in_qa' do
    @task.in_development
    @task.ready_for_review
    assert_equal 'in_qa', @task.state
  end

  test ':in_qa task can be moved to :in_code_review' do
    @task.in_development
    @task.ready_for_review
    @task.ready_for_code_review
    assert_equal 'in_code_review', @task.state
  end

  test ':in_qa task can be moved back to :in_development' do
    @task.in_development
    @task.ready_for_review
    @task.in_development
    assert_equal 'in_development', @task.state
  end

  test ':in_code_review task can be moved to :ready_for_release' do
    @task.in_development
    @task.ready_for_review
    @task.ready_for_code_review
    @task.ready_for_release
    assert_equal 'ready_for_release', @task.state
  end

  test ':in_code_review task can be moved back to :in_development' do
    @task.in_development
    @task.ready_for_review
    @task.ready_for_code_review
    @task.in_development
    assert_equal 'in_development', @task.state
  end

  test ':ready_for_release task can be moved to :released' do
    @task.in_development
    @task.ready_for_review
    @task.ready_for_code_review
    @task.ready_for_release
    @task.released
    assert_equal 'released', @task.state
  end

  test ':released task can be moved to :archived' do
    @task.in_development
    @task.ready_for_review
    @task.ready_for_code_review
    @task.ready_for_release
    @task.released
    @task.archived
    assert_equal 'archived', @task.state
  end
end
