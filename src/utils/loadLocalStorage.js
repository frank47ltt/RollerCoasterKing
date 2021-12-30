const storageKey = 'rollercoasters';

/*
[{
  id : 1,
  checkin: true,
  star: 5
},{
  id : 2,
  checkin: false,
  star: 4
},
...]
*/

export const loadStorage = () => {
  return JSON.parse(localStorage.getItem(storageKey));
};

export const saveStorage = (rollercoasters) => {
  return localStorage.setItem(storageKey, JSON.stringify(rollercoasters));
};

export const updateCheckin = (rollercoaster) => {
  let storage = loadStorage();
  if (!storage) {
    storage = [];
  }
  const target = storage.find(
    (roller) => roller && roller.id === rollercoaster.id
  );
  if (!target) {
    storage.push({
      ...rollercoaster,
    });
  } else {
    target.checkin = rollercoaster.checkin;
  }
};
