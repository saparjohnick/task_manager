class User < ApplicationRecord
  has_secure_password

  validates :first_name, length: { minimum: 2 }
  validates :last_name, length: { minimum: 2 }
  validates :email, uniqueness: true

  validates_presence_of :first_name, :last_name, :email
  validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
end
