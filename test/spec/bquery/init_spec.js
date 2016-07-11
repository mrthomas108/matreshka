import $ from 'src/bquery';

describe('bQuery initialization', function test() {
	const testSandbox = document.createElement('div');

	testSandbox.innerHTML = `
		<div class="test">
			<div class="test-1"></div>
			<div class="test-2"></div>
			<div class="test-3"></div>
		</div>
	`;

	it('accepts window', () => {
		const result = $(window);
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(window);
	});

	it('accepts document', () => {
		const result = $(document);
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(document);
	});

    it('parses HTML', () => {
        const result = $('<div></div><span></span>');

        expect(result.length).toEqual(2);
        expect(result[0].tagName).toEqual('DIV');
        expect(result[1].tagName).toEqual('SPAN');
    });

    // нужно как-то избавиться от вызова $b в parseHTML
    // тесты для событий есть в старой версии
    // останется рефакторить и затестить add, find, not, fn, is, one, create
    // после всего нужно включить линтер и проверить коверадж

    it('converts array-like', () => {
        const children = testSandbox.querySelectorAll('*'),
			result = $(children);

        expect(children.length).toEqual(result.length);

        for(let i = 0; i < children.length; i++) {
            expect(children[i]).toEqual(result[i]);
        }
    });

	it('Converts one element', () => {
		const element = document.querySelector('*'),
			result = $(element);

		expect(result.length).toEqual(1);
		expect(element).toEqual(result[0]);
	});

	it('Uses context', () => {
		expect(
			$('.test-1', testSandbox).length
		).toEqual(1);
	});

	it('Uses context', () => {
		expect(
			$('.test-1', '.wrong-context').length
		).toEqual(0);
	});

	it('Allows to use null', () => {
		expect(
			$(null).length
		).toEqual(0);
	});

	it('Allows to use undefined', () => {
		expect(
			$().length
		).toEqual(0);
	});

	it('Allows to create plugins', () => {
		$.fn.bQueryPlugin = function() {
			expect(
				this.length
			).toEqual(
				testSandbox.querySelectorAll('*').length
			);
		};

		spyOn($.fn, 'bQueryPlugin');

		$('*', testSandbox).bQueryPlugin();

		expect($.fn.bQueryPlugin).toHaveBeenCalled();
	});
});
