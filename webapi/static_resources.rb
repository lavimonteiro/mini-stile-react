require 'sinatra'

get '/assets/:file' do |file|
    send_file "../dist/assets/#{file}"
end

get '/*' do
    send_file "../dist/index.html"
end