import {CAR_ACTION, CarsAction} from './cars.action';

const initialState = { // начальная инициализация state
  cars: []
};

export function carsRducer(state = initialState, action: CarsAction) { // редюссер получает в себя предыдущий стейт и экшн с новыми данными
  switch (action.type) { // экш содержит в себе филд тайп - тип экшена по ко торому редюсер понимет что именно нужно сделать с данными
    case CAR_ACTION.ADD_CAR:
      return {
        ...state,
        cars: [...state.cars, action.data] // и содержит payload - это данные которые передали в экш для изменения стейта
      };
    case CAR_ACTION.DELETE_CAR: // например тут экш удаления машины
      return {
        ...state, // старый стейт
        cars: [...state.cars.filter(car => car.id !== action.data.id)] // помещение в эрей машин нового эрея с измененным списком машин
        // в данном случае эрея с удаленной 1 машиной
      };
    case CAR_ACTION.UPDATE_CAR:

      const carActive = state.cars.find(s => s.id === action.data.id);
      const carIndex = state.cars.indexOf(carActive);

      state.cars[carIndex] = action.data;

      return {
        ...state,
        cars: [...state.cars]
      };
    case CAR_ACTION.LOAD_CARS:
      return {
        ...state,
        cars: [...action.data]
      };
    default: // по умолчаию передается старый стейт
      return state;
  }
}
