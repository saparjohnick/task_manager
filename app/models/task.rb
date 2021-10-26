class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }

  state_machine :state, initial: :new_task do
    event :moved_to_development do
      transition [:new_task, :in_qa, :in_code_review] => :in_development
    end

    event :moved_to_qa do
      transition in_development: :in_qa
    end

    event :approved_by_qa do
      transition in_qa: :in_code_review
    end

    event :approved_by_code_review do
      transition in_code_review: :ready_for_release
    end

    event :released do
      transition ready_for_release: :released
    end

    event :archived do
      transition [:new_task, :released] => :archived
    end
  end
end
