class CreateDocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :documents do |t|
      t.string :name
      t.integer :folder_id
      t.timestamps
    end
  end
end
