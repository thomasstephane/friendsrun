get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/' do
  @players = params[:players].to_i
  erb :game
end


post '/game' do 
  @players = params[:players].to_i
  @players.times do |i|
    player = ["name#{i+1}".to_sym,"email#{i+1}".to_sym,"user_id#{i+1}".to_sym]
    user = User.find_or_create_by_name(name: params[player[0]], email: params[player[1]])
    session[player[2]] = user.id
  end
  session[:length] = params[:length]
  session[:nb_players] = @players
  redirect "/game"
end


get '/game' do 
  @game = Game.create(track_length: session[:length].to_i)
  @players = session[:nb_players]
  @players.times do |i|
    player = "user_id#{i+1}".to_sym
    GamesUser.create(user_id: session[player], game_id: @game.id)
  end
  erb :play
end


post '/finish' do
  content_type :json
  @game = Game.find(params["game_id"].to_i)
  @winner_id = session[("user_id" + params["winner"]).to_sym]
  @game.update_attributes(winner_id: @winner_id, time: params["time"].to_i)
end