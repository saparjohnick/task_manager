FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :email, :avatar, :type, :name, :description, :state] do |n|
    "string #{n}"
  end

  sequence :int, aliases: [:author_id, :assignee_id] do |_n|
    123
  end

  sequence :date, aliases: [:expired_at] do |_n|
    DateTime.now
  end
end
