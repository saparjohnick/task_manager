require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "task created" do
    user = create(:user)
    task = create(:task, author: user)
    params = { user: user, task: task }
    email = UserMailer.with(params).task_created

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'New Task Created', email.subject
    assert email.body.to_s.include?("Task ##{@task.id}: #{@task.name} was created")
  end

  test "task update" do 
    user = create(:user)
    task = create(:task, author: user)
    
    params = { user: user, task: task }
    email = UserMailer.with(params).task_updated

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'New Task Updated', email.subject
    assert email.body.to_s.include?("Task ##{@task.id}: #{@task.name} was updated")
  end

  test "task delete" do 
    user = create(:user)
    task = create(:task, author: user)
    
    params = { user: user, task: task }
    email = UserMailer.with(params).task_deleted

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'New Task Deleted', email.subject
    assert email.body.to_s.include?("Task ##{@task.id}: #{@task.name} was deleted")
  end
end
