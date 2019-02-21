import { getFormatter } from 'dash-table/type/number';

describe('formatting', () => {
    describe('number', () => {
        it('returns undefined formatter with undefined format', () => {
            const formatter = getFormatter(undefined, undefined);
            assert.isNotOk(formatter);
        });

        describe('without nully handling / default locale', () => {
            it('formats currency', () => {
                const formatter = getFormatter(undefined, {
                    specifier: '$.2f'
                });

                assert.isOk(formatter);

                if (formatter) {
                    expect(formatter(0)).to.equal('$0.00');
                    expect(formatter(1)).to.equal('$1.00');
                    expect(formatter(-1)).to.equal('-$1.00');
                    expect(formatter(1.23)).to.equal('$1.23');
                    expect(formatter(1.232)).to.equal('$1.23');
                    expect(formatter(1.239)).to.equal('$1.24');
                    expect(formatter(1766)).to.equal('$1766.00');
                    expect(formatter(''), 'Empty string case').to.equal('');
                    expect(formatter('foo'), 'Foo string case').to.equal('foo');
                    expect(formatter(true), 'Empty string case').to.equal(true);
                    expect(formatter(NaN), 'NaN case').to.equal('');
                    expect(formatter(Infinity), 'Infinity case').to.equal('');
                    expect(formatter(-Infinity), '-Infinity case').to.equal('');
                    expect(formatter(null as any), 'null case').to.equal('');
                    expect(formatter(undefined as any), 'undef case').to.equal('');
                }
            });
        });

        describe('with nully handling / default locale', () => {
            it('formats significant digits and grouping separator', () => {
                const formatter = getFormatter(undefined, {
                    nully: 42.42,
                    specifier: ',.2r'
                });

                assert.isOk(formatter);

                if (formatter) {
                    expect(formatter(0)).to.equal('0.0');
                    expect(formatter(0.13)).to.equal('0.13');
                    expect(formatter(0.131)).to.equal('0.13');
                    expect(formatter(1.23)).to.equal('1.2');
                    expect(formatter(1.299)).to.equal('1.3');
                    expect(formatter(1299)).to.equal('1,300');
                    expect(formatter(1299431)).to.equal('1,300,000');
                    expect(formatter(''), 'Empty string case').to.equal('');
                    expect(formatter('foo'), 'Foo string case').to.equal('foo');
                    expect(formatter(true), 'Empty string case').to.equal(true);
                    expect(formatter(NaN), 'NaN case').to.equal('42');
                    expect(formatter(Infinity), 'Infinity case').to.equal('42');
                    expect(formatter(-Infinity), '-Infinity case').to.equal('42');
                    expect(formatter(null as any), 'null case').to.equal('42');
                    expect(formatter(undefined as any), 'undef case').to.equal('42');
                }
            });
        });

        describe('with nully handling / partial locale override', () => {
            it('formats significant digits and grouping separator', () => {
                const formatter = getFormatter(undefined, {
                    locale: {
                        decimal: 'x',
                        grouping: [2, 1]
                    },
                    nully: '42.4242',
                    specifier: ',.2f'
                });

                assert.isOk(formatter);

                if (formatter) {
                    expect(formatter(0)).to.equal('0x00');
                    expect(formatter(0.13)).to.equal('0x13');
                    expect(formatter(0.131)).to.equal('0x13');
                    expect(formatter(1.23)).to.equal('1x23');
                    expect(formatter(1.299)).to.equal('1x30');
                    expect(formatter(1299)).to.equal('1,2,99x00');
                    expect(formatter(1299431)).to.equal('1,2,99,4,31x00');
                    expect(formatter(''), 'Empty string case').to.equal('');
                    expect(formatter('foo'), 'Foo string case').to.equal('foo');
                    expect(formatter(true), 'Empty string case').to.equal(true);
                    expect(formatter(NaN), 'NaN case').to.equal('42.4242');
                    expect(formatter(Infinity), 'Infinity case').to.equal('42.4242');
                    expect(formatter(-Infinity), '-Infinity case').to.equal('42.4242');
                    expect(formatter(null as any), 'null case').to.equal('42.4242');
                    expect(formatter(undefined as any), 'undef case').to.equal('42.4242');
                }
            });
        });

        describe('without nully handling / default locale / si prefix', () => {
            it('formats currency', () => {
                const formatter = getFormatter(undefined, {
                    prefix: 0.001,
                    specifier: '.0f'
                });

                assert.isOk(formatter);

                if (formatter) {
                    expect(formatter(0)).to.equal('0m');
                    expect(formatter(1)).to.equal('1000m');
                    expect(formatter(-1)).to.equal('-1000m');
                    expect(formatter(1.23)).to.equal('1230m');
                    expect(formatter(1.232)).to.equal('1232m');
                    expect(formatter(1.239)).to.equal('1239m');
                    expect(formatter(1766)).to.equal('1766000m');
                    expect(formatter(''), 'Empty string case').to.equal('');
                    expect(formatter('foo'), 'Foo string case').to.equal('foo');
                    expect(formatter(true), 'Empty string case').to.equal(true);
                    expect(formatter(NaN), 'NaN case').to.equal('');
                    expect(formatter(Infinity), 'Infinity case').to.equal('');
                    expect(formatter(-Infinity), '-Infinity case').to.equal('');
                    expect(formatter(null as any), 'null case').to.equal('');
                    expect(formatter(undefined as any), 'undef case').to.equal('');
                }
            });
        });
    });
});