require 'sinatra/base'
require 'thin'
require 'haml'

EventMachine.run do
  
 class Application < Sinatra::Base  
   Thread.main[:sass_watcher] = Thread.new do  
     %x[sass --watch public/sass:public/stylesheets]  
   end  
 
   get '/' do  
     haml :index  
   end  
 end  
 
 Application.run!({:port => 3000})
 
end  
