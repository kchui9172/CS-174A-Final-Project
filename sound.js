
function finishedLoading(bufferList) {
  var source1 = context.createBufferSource();
  source1.buffer = bufferList[0];

  source1.connect(context.destination);
  source1.start(0);
}

function playAnimalSound(bufferList, i) {
  var source1 = context.createBufferSource();
  source1.buffer = bufferList[i];
  source1.connect(context.destination);
  source1.start(i);
}