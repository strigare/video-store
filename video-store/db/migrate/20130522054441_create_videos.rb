class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :name
      t.string :title
      t.text :description
      t.string :yt_id

      t.timestamps
    end
  end
end
