ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

if ENV['COVERAGE'] == true
  require 'simplecov'
  require 'simplecov-lcov'

  SimpleCov::Formatter::LcovFormatter.config.report_with_single_file = true
  SimpleCov.formatter = SimpleCov::Formatter::LcovFormatter
  SimpleCov::Formatter::LcovFormatter.config do |c|
    c.output_directory = './' # default: "coverage/lcov"
    c.lcov_file_name = 'lcov.info' # default: "YOUR_PROJECT_NAME.lcov"
    c.single_report_path = './lcov.info'
  end
  SimpleCov.start
end

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
  include AuthHelper
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
