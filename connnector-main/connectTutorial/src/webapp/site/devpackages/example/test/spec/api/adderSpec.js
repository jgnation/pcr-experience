define(['example'], function(Example) {
    describe('Adder API', function() {
        var adder;
        beforeEach(function() {
            adder = new Example.Adder();
        });

        it('should expose the function compute', function() {
            expect(adder.compute).toBeDefined();
        });

        it('should not expose the function displayResult', function() {
            expect(adder.displayResult).toBeUndefined();
        });

        it('should call displayResult when compute is called', function() {
            sinon.stub(adder._wrapped, 'displayResult');
            adder.compute(1, 2);
            expect(adder._wrapped.displayResult.calledWith(3)).toBeTruthy();
        });
    });
});