require 'sinatra'
require 'sequel'
require 'sinatra/namespace'
require 'json'
require 'pp'
DB = Sequel.connect(  {
    adapter: 'mysql2',
    host: 'localhost',
    user: 'root',
    password:'password',
    database: 'mini-stile',
},)

namespace '/api/v1' do
  
    before do
        content_type 'application/json'
    end
    
    helpers do
        def base_url
          @base_url ||= "#{request.env['rack.url_scheme']}://#{request.env['HTTP_HOST']}"
        end
    
        def json_params
          begin
            JSON.parse(request.body.read)
          rescue
            halt 400, { message:'Invalid JSON' }.to_json
          end
        end
    end
    get '/library/cards' do
        card = DB.fetch( "SELECT * FROM lessons JOIN card_content 
        ON lessons.lesson_id =  card_content.lesson_id 
        JOIN images
        ON card_content.image_id = images.image_id;
        ").all
        halt(404, { message:'Lessons Not Found'}.to_json) unless card.length>0
        cardArr = []
        card.each do |object| 
          cardArr.push({"lesson_title":"#{object["lesson_name".to_sym]}", "text_content":"#{object["text_content".to_sym]}","url":"#{object["url".to_sym]}", "classification":"#{object["classification".to_sym]}", "image":"#{object["image_url".to_sym]}", "alt_text":"#{object["description".to_sym]}"})
        end
        cardArr.to_json 
    end

    get '/library/lesson/:name' do |name|
      lesson = DB.fetch("SELECT * FROM lessons JOIN lesson_content 
      ON lessons.lesson_id =  lesson_content.lesson_id 
      WHERE lessons.lesson_name = '#{name}' ;
      ").all
      images = DB.fetch("SELECT images.image_url, images.description FROM img_content JOIN lessons ON lessons.lesson_id = img_content.lesson_id JOIN images 
      ON img_content.image_id =  images.image_id 
      WHERE lessons.lesson_name = '#{name}' ;
      ").all
      halt(404, { message:'Lesson Not Found'}.to_json) unless lesson.length>0
      lesson = lesson[0]
      base = images[0]
      ontop = images[1]
      { "lesson_title":"#{lesson['lesson_name'.to_sym]}", "text_content":"#{lesson['text_content'.to_sym]}", "base_url":"#{base['image_url'.to_sym]}" , "base_alt": "#{base['description'.to_sym]}", "on_top_url":"#{ontop['image_url'.to_sym]}" , "on_top_alt":"#{ontop['description'.to_sym]}" }.to_json
  end


end

