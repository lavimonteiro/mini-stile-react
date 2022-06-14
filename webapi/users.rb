require 'sinatra'
require "sinatra/namespace"
require 'sequel'
require 'json'

    DB = Sequel.connect(
                    {
                        adapter: 'mysql2',
                        host: 'localhost',
                        user: 'root',
                        password: 'password',
                        database: 'mini-stile',
                    },
                ) 


namespace '/api/v1' do 

  before do
    content_type 'application/json'
  end

  helpers do
    def json_params
        JSON.parse(request.body.read)
    end
  end

  post '/login' do  
    login_data = json_params
    login = DB.fetch("SELECT * FROM users WHERE username = '#{login_data['username']}' && password = '#{login_data['password']}'").all

    if login.length >= 1
      
        halt(200, { message:'log-in successful'}.to_json)
        #make so that the logged in box appears
    else
         halt(401, { message:'Error'}.to_json) 
         #make so that error message "incorrect username/password appears"
    end
  end 

  put '/user'     do
    login_data = json_params
    account = DB.fetch("SELECT * FROM users WHERE username = '#{login_data['username']}' OR email = '#{login_data['email']}'").all

    if account.length < 1 
      DB.execute("INSERT INTO users (username, email, password) VALUES ('#{login_data['username']}','#{login_data['email']}','#{login_data['password']}')")
      halt(200, { message:'account created'}.to_json)
    else 
      halt(424, { message:'Invalid data input'}.to_json)
    end  
  end 

end
