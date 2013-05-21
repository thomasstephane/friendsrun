class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :track_length, :winner_id
      t.integer :time
      t.timestamps
    end
  end
end
