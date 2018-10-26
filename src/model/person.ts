export class Person {
    private _genero: string;
    private _peso: number;
    private _altura: number;

    constructor() {
        this._genero = "M";
        this._altura = 1.7;
        this._peso = 64;
    }

    static copia(dados: Object): Person {
        return Object.assign(new Person(), dados);
    }

    calcularIMC() {
        return (this._peso / (this._altura * this._altura));
    }

    calcularPesoIdeal() {
        if (this._genero == "M") {
            return ((this._altura * 100) - 100) * 0.9;
        }
        return ((this._altura * 100) - 100) * 0.85;
    }

    obterSituacaoIMC() {
        let imc = this.calcularIMC();
        if (imc < 18.5) {
            return "Abaixo do peso";
        } else if (imc <= 24.9) {
            return "Peso ideal :)";
        } else if (imc <= 29.9) {
            return "Sobrepeso";
        }
        return "Obeso";
    }

    set genero(genero: string) {
        this._genero = genero;
    }

    get genero() {
        return this._genero;
    }

    set peso(peso: number) {
        this._peso = peso;
    }

    get peso() {
        return this._peso;
    }

    set altura(altura: number) {
        this._altura = altura;
    }

    get altura() {
        return this._altura;
    }
}