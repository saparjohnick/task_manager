# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do |i|
  User.create(first_name: "User ##{i}", last_name: "Sidorov", email: "test_user_#{i}@test.test", password: "12345678", password_confirmation: "12345678")
end

2.times do |i|
  Admin.create(first_name: "Admin ##{i}", last_name: "Sidorov", email: "test_admin_#{i}@test.test", password: "12345678", password_confirmation: "12345678")
end

6.times do |i|
  u = [Manager, Developer].sample.new
  u.email = "email_#{i}@mail.gen"
  u.first_name = "FN_#{i}@mail.gen"
  u.last_name = "LN_#{i}@mail.gen"
  u.password = "#{i}"
  u.save
end
