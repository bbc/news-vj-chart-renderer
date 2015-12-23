define(['chartRenderer'],  function (chartRenderer) {

    describe('Chart renderer', function () {

        it('Returns hello world', function () {
            expect(chartRenderer.init()).toEqual('Hello World');
        });

    });

});
