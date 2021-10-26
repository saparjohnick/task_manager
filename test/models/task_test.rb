require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'create' do
    @task = create(:task)
    assert @task.persisted?
  end

  test 'initial state should be :new_task' do
    @task = create(:task, state: :new_task)
    assert_equal 'new_task', @task.state
  end

  test 'new task can be moved to :in_development' do
    @task = create(:task, state: :new_task)
    @task.moved_to_development
    assert_equal 'in_development', @task.state
  end

  test 'new task can be moved to :archived' do
    @task = create(:task, state: :new_task)
    @task.archived
    assert_equal 'archived', @task.state
  end

  test ':in_development task can be moved to :in_qa' do
    @task = create(:task, state: :in_development)
    @task.moved_to_qa
    assert_equal 'in_qa', @task.state
  end

  test ':in_qa task can be moved to :in_code_review' do
    @task = create(:task, state: :in_qa)
    @task.approved_by_qa
    assert_equal 'in_code_review', @task.state
  end

  test ':in_qa task can be moved back to :in_development' do
    @task = create(:task, state: :in_qa)
    @task.moved_to_development
    assert_equal 'in_development', @task.state
  end

  test ':in_code_review task can be moved to :ready_for_release' do
    @task = create(:task, state: :in_code_review)
    @task.approved_by_code_review
    assert_equal 'ready_for_release', @task.state
  end

  test ':in_code_review task can be moved back to :in_development' do
    @task = create(:task, state: :in_code_review)
    @task.moved_to_development
    assert_equal 'in_development', @task.state
  end

  test ':ready_for_release task can be moved to :released' do
    @task = create(:task, state: :ready_for_release)
    @task.released
    assert_equal 'released', @task.state
  end

  test ':released task can be moved to :archived' do
    @task = create(:task, state: :released)
    @task.archived
    assert_equal 'archived', @task.state
  end
end
