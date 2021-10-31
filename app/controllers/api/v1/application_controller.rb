class Api::V1::ApplicationController < Api::ApplicationController
  def self.responder
    JsonResponder
  end
end
