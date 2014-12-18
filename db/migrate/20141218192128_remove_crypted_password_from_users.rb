class RemoveCryptedPasswordFromUsers < ActiveRecord::Migration
  def change
  	remove_column :users, :crypted_password, :string
  end
end
