import { observable, action } from "mobx";


//let dati = [];

interface IAvatar {
  FnameAvatar: string;
}

class AvatarStore {
  @observable friendAvatar: IAvatar | null = null;

  @action
  setAvatar(NewName:any) {
    this.friendAvatar = NewName;


  }

}
export const avatarStore = new AvatarStore();
