class V1::Api::ApplicationController < Api::ApplicationController
  def self.responder
    JsonResponder
  end
end
