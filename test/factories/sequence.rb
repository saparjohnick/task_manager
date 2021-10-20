FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :avatar, :type, :name, :description, :state] do |n|
    "string #{n}"
  end

  sequence :date, aliases: [:expired_at] do |_n|
    DateTime.now
  end
end
