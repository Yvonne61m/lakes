import { countLakes } from './lakes'
import { drawBoard } from './lakes'
import { expect } from 'chai';
import * as samples from './samples.json';
import 'mocha'



describe('Test 1', () => {
  it('', () => {
    for (let i = 0; i < samples.length; i++) {
      let input = samples[i].input
      let board = drawBoard(input)
      const result = countLakes(input, board);
      expect(result.length).equal(samples[i].number)
      result.forEach(element => {
        expect(element.surface).equal(samples[i].surface)
        expect(element.volume).equal(samples[i].volume)
      });
    }
  });
});
