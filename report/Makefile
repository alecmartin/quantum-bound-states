TEXDIR = ./tex/

all:
	make report
	make clean

report:
	pdflatex --shell-escape -interaction=batchmode $(TEXDIR)QuantumBoundStates.tex
	pdflatex --shell-escape -interaction=batchmode $(TEXDIR)QuantumBoundStates.tex
	pdflatex --shell-escape -interaction=batchmode $(TEXDIR)QuantumBoundStates.tex

debug:
	pdflatex --shell-escape $(TEXDIR)QuantumBoundStates.tex

clean:
	for FILE in `find . -type f | grep -e "\.pyg\|\.aux\|\.log\|\.toc\|\.out\|\.equ\|\.lof\|\.tar\.gz"`; do rm $$FILE; done

push:
	echo "Not Implemented"
