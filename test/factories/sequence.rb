FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :avatar, :name, :description] do |n|
    "string #{n}"
  end

  sequence :email do |_n|
    Faker::Internet::email
  end
end
