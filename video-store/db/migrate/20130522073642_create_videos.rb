class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :title
      t.string :category
      t.text :description
      t.string :youtube

      t.timestamps
    end
  end
end
