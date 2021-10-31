FactoryBot.define do
  factory :task do
    name
    description
    association :author, factory: :manager
    association :assignee, factory: :manager
  end
end
