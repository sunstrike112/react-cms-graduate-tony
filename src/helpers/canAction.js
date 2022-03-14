import { AbilityBuilder, Ability } from "@casl/ability";
import { store } from 'stores';


// config
import { USER_ROLE } from 'configs/userRole';
import authStorage from "./authStorage";

// cvud -> create, view, update, delete
function defineAbilitiesFor(role) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch(role) {
    case USER_ROLE.ADMIN:
      can(['create', 'view', 'update', 'delete'], 'all')
      break;
    case USER_ROLE.GUEST:
      cannot(['create', 'view', 'update', 'delete'], 'all')
      break;
    case USER_ROLE.OPERATOR:
      can('view', 'btnDelete')
      can('view', 'button')
      break;
    default:
      break;
  }

  return build();
}

function canAction(action, resource) {
  const role = store.getState().app.user?.user?.role || authStorage.getStorage('role');
  if(!role) return false;

  const abilities = defineAbilitiesFor(role);
  return abilities.can(action, resource)
}

export default canAction;