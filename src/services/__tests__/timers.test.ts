import { repeatEachInterval, runAfterInterval } from "../timers";

const UM_SEGUNDO = 1000;
describe('timers', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('deve executar uma tarefa apenas um determinado período', () => {
    const callback = jest.fn();

    runAfterInterval(callback, 2 * UM_SEGUNDO);
    expect(callback).not.toHaveBeenCalledWith();

    jest.advanceTimersByTime(UM_SEGUNDO);
    expect(callback).not.toHaveBeenCalledWith();

    jest.advanceTimersByTime(UM_SEGUNDO);
    expect(callback).toHaveBeenCalledWith();
  });

  it('deve executar uma tarefa diversas vezes dento de um intervalo', () => {
    const callback = jest.fn();
    repeatEachInterval(callback, UM_SEGUNDO)

    jest.advanceTimersByTime(60 * UM_SEGUNDO);
    expect(callback).toHaveBeenCalledTimes(60);
  });
});