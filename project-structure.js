// Proje Yapısı ve Kod Veritabanı
const projectStructure = {
    "ACTKernal": {
        "name": "ACTKernal - Desktop IDE",
        "version": "3.0",
        "type": "Java Desktop Application",
        "structure": {
            "GUI": {
                "type": "folder",
                "children": {
                    "IDE": {
                        "type": "folder",
                        "children": {
                            "IDE.java": {
                                "type": "file",
                                "language": "java",
                                "path": "ACTKernal/src/main/java/GUI/IDE/IDE.java",
                                "description": "Ana IDE penceresi - Swing tabanlı GUI",
                                "code": `package GUI.IDE;

import Tehliledici.ACTehliledici;
import backend.CloseableTabbedPane;
import backend.Elaveler;
import backend.KodIsleyici;
import backend.OzelJSCroll;
import backend.KeyboardBack.Keyboard;
import backend.MouseBack.Mouse;
import backend.resLoader.ResLoader;
import GUI.IDE.BackEnd.IdeBE;
import GUI.KomekHelp.KomekHelp;
import backend.Translater;
import backend.encrypt5.E5;
import backend.encrypt5.SoftwareControlSystem;
import java.awt.Color;
import java.awt.Toolkit;
import java.awt.event.MouseEvent;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.ImageIcon;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;

/**
 * Ana IDE Sınıfı
 * @author mehemmed
 */
public class IDE extends javax.swing.JFrame {
    
    public static KodIsleyici[] KI = new KodIsleyici[100];
    public static int SAYACKI = 0;
    public static int SecilenKodIsleyici;

    public static OzelJSCroll[] SCP = new OzelJSCroll[100];
    public static int SAYACSCP = 0;

    public static String sla = "/";
    
    //FILES  
    public static final String IDECF = "src"+sla+"main"+sla+"java"+sla+"GUI"+sla+"IDE"+sla+"Config"+sla+"OldAcFile.idecf";
    public static final String IDS = "src"+sla+"main"+sla+"java"+sla+"GUI"+sla+"IDE"+sla+"Config"+sla+"IdeDefSet.idd";
    
    static boolean bayrag = true;
    public static boolean OZELACANBAYRAG = false;
    public static boolean RUNFLAG = false;
    public static int RUNSAYAC = 0;
    
    public static KomekHelp KH;
    private static final String OS = System.getProperty("os.name").toLowerCase();
    public static boolean LeanguageDil = false;
    
    public static boolean isWindows() {
        return (OS.contains("win"));
    }

    public static boolean isMac() {
        return (OS.contains("mac"));
    }

    public static boolean isUnix() {
        return (OS.contains("nix") || OS.contains("nux") || OS.indexOf("aix") > 0);
    }

    public static boolean isSolaris() {
        return (OS.contains("sunos"));
    }

    public static void os() {
        if (isWindows()) {
            sla = "\\\\";
        } else if (isUnix()) {
            sla = "/";
        } else {
            sla = "/";
        }
    }
    
    //Object Extends And Detection
    public static Mouse mouse = new Mouse();
    public static Keyboard keyboard = new Keyboard();
    public static ResLoader resLoader = new ResLoader();
    static Elaveler elaveler = new Elaveler();

    /**
     * Creates new form IDE
     */
    public IDE() {
        IDEDefData();
        initComponents();
        this.StartHome.setVisible(true);
        
        JFrame THIS = this;
        JFrame SH = this.StartHome;
        
        new java.util.Timer().schedule(new java.util.TimerTask() {
            @Override
            public void run() {
                java.awt.EventQueue.invokeLater(() -> {
                    SH.setVisible(false);
                    THIS.setVisible(true);
                });
            }
        }, 9000);
    }
    
    // ... diğer metodlar ...
}`
                            },
                            "BackEnd": {
                                "type": "folder",
                                "children": {
                                    "IdeBE.java": {
                                        "type": "file",
                                        "language": "java",
                                        "path": "ACTKernal/src/main/java/GUI/IDE/BackEnd/IdeBE.java",
                                        "description": "IDE backend işlemleri",
                                        "code": "// IDE Backend sınıfı"
                                    }
                                }
                            }
                        }
                    },
                    "Consol.java": {
                        "type": "file",
                        "language": "java",
                        "path": "ACTKernal/src/main/java/GUI/Consol.java",
                        "description": "Konsol penceresi",
                        "code": "// Konsol sınıfı"
                    }
                }
            },
            "Tehliledici": {
                "type": "folder",
                "children": {
                    "ACTehliledici.java": {
                        "type": "file",
                        "language": "java",
                        "path": "ACTKernal/src/main/java/Tehliledici/ACTehliledici.java",
                        "description": "AC kodunu derleyen ve yorumlayan ana sınıf",
                        "code": `package Tehliledici;

import java.io.*;
import java.util.Date;
import java.util.Scanner;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import GUI.IDE.IDE;
import static GUI.IDE.IDE.os;
import ac.acSystemFayilari;
import Tehliledici.Cesitler.AcarSozler;
import Tehliledici.Tool.Deyisgen;
import Tehliledici.Tool.Fonksiyon;
import Tehliledici.Tool.Error.Error;
import Tehliledici.Tool.FonksiyonDeyisgenleri;
import backend.Translater;
import java.util.concurrent.TimeUnit;

public class ACTehliledici extends Elaveler {
    
    //AC-IDE OZEL BILDIRIM LERI
    public static boolean AC_IDE_BILDIRISI = true;
    public static String IDE_DOSYAYOLU = "";
    public static String IDE_DOSYAADI = "";
    
    //OZEL VEZIYET
    private static boolean VARSAYILAN_VEZIYET = true;
    
    //MetinTehliledici si icersinde isdifade olunan deyisgenler
    static int Dosya_Basliqlarini_Sayaci = 0;
    
    //MetinIcAlici
    public static boolean PROBLEM_BAYRAGI = false;
    public static boolean Gonderilen_Deyer = false;
    public static boolean Problem_MetinIcAlici = false;
    
    //JAVA VE C BILDIRIM DEYISGENLERI
    public static boolean JAVAERRORNOTFI = false;
    public static boolean CERRORNOTFI = false;
    
    //Yardimci Toolar Ve onlarin Object tanimlamasi
    private static ACT act = new ACT();
    private static Ayrici ayrici = new Ayrici();
    
    //USTGLOBAL DEYISGENLERI 
    public static boolean ustglobal_bayrag = true;
    static boolean Baslad = false;
    
    //ONEMLI BAYRAG DEYISGENLERI
    static boolean dosya_bayrag = false; 
    static int dosya_baslanqic = 0;
    private static boolean Bayrag = true;
    
    public static String vaxt(){
        Date Vaxt = new Date();
        Yazdir("\\n----------------------------------------------------\\n["+Vaxt.toString()+"]", "Consol");
        return "["+Vaxt.toString()+"]";
    }
    
    public ACTehliledici() {
        //ACTehliledici nin conustructuru
    }
    
    public static boolean isWindows() {return (OS.indexOf("win") >= 0);}
    public static boolean isMac() {return (OS.indexOf("mac") >= 0);}
    public static boolean isUnix() {return (OS.indexOf("nix") >= 0 || OS.indexOf("nux") >= 0 || OS.indexOf("aix") > 0 );}
    public static boolean isSolaris() {return (OS.indexOf("sunos") >= 0);}
    
    // ... diğer metodlar ...
}`
                    },
                    "ACT.java": {
                        "type": "file",
                        "language": "java",
                        "path": "ACTKernal/src/main/java/Tehliledici/ACT.java",
                        "description": "AC dil işlemleri",
                        "code": "// ACT sınıfı"
                    },
                    "Tool": {
                        "type": "folder",
                        "children": {
                            "Fonksiyon.java": {
                                "type": "file",
                                "language": "java",
                                "path": "ACTKernal/src/main/java/Tehliledici/Tool/Fonksiyon.java",
                                "description": "Fonksiyon tanımlama ve yönetimi",
                                "code": `package Tehliledici.Tool;

import java.util.ArrayList;
import java.util.Random;
import Tehliledici.Cesitler.AcarSozler;
import Tehliledici.Elaveler;

public class Fonksiyon {
    
    //String Values
    private String FONKSIYON_ISMI = "";
    private String FONKISYON_GERI_DONDURULEN = "";
    private String FONKSIYON_ICERIGI = "";
    
    //ArrayList Values
    private ArrayList<String> FONKSIYON_ICERIG_DEYIGSENLERI = new ArrayList<String>();
    private ArrayList<FonksiyonDeyisgenleri> FONKSIYON_DEYISGENLERI = new ArrayList<FonksiyonDeyisgenleri>();
    
    //Int values
    private int Fonksiyon_ID = 0;
    private int FONKSIYON_ICERIG_DEYISGENLERININ_SAYI = 0;
    private int FONKSIYON_UID = 0;

    private boolean GERI_DONDURUCU_DURUMU = false;
    
    public Fonksiyon(String FONKSIYON_ISMI, String FONKISYON_GERI_DONDURULEN, 
                     String FONKSIYON_ICERIGI, ArrayList FONKSIYON_ICERIG_DEYIGSENLERI, 
                     ArrayList FONKSIYON_DEYISGENLERI, int FONKSIYON_ICERIG_DEYISGENLERININ_SAYI, 
                     int Fonksiyon_ID, int FONKSIYON_UID) {
        this.Fonksiyon_ID = Fonksiyon_ID; 
        this.FONKSIYON_ISMI = FONKSIYON_ISMI;
        this.FONKISYON_GERI_DONDURULEN = FONKISYON_GERI_DONDURULEN;
        this.FONKSIYON_ICERIGI = FONKSIYON_ICERIGI;
        this.FONKSIYON_ICERIG_DEYIGSENLERI = FONKSIYON_ICERIG_DEYIGSENLERI;
        this.FONKSIYON_ICERIG_DEYISGENLERININ_SAYI = FONKSIYON_ICERIG_DEYISGENLERININ_SAYI;
        this.FONKSIYON_DEYISGENLERI = FONKSIYON_DEYISGENLERI;
        this.FONKSIYON_UID = FONKSIYON_UID;
    }
    
    public static Fonksiyon FonksiyonArama(String Fonksiyon_ismi){
        for(int index = 1; index < AcarSozler.FONKSIYON_SAYAC; index++) {
            if(Fonksiyon_ismi.equals(AcarSozler.FONKSIYONLAR[index].getFONKSIYON_ISMI())){
                return AcarSozler.FONKSIYONLAR[index];
            }
        }
        return null;
    }
    
    public static boolean FonksiyonVarlikYoxlayici(String Fonksiyon_Ismi){
        for(int index = 1; index < AcarSozler.FONKSIYON_SAYAC; index++) {
            if(Fonksiyon_Ismi.equals(AcarSozler.FONKSIYONLAR[index].getFONKSIYON_ISMI())){
                return false;
            }
        } 
        return true;
    }
    
    // Getter ve Setter metodları
    public String getFONKSIYON_ISMI() {
        return this.FONKSIYON_ISMI;
    }

    public String getFONKISYON_GERI_DONDURULEN() {
        return FONKISYON_GERI_DONDURULEN;
    }

    public String getFONKSIYON_ICERIGI() {
        return FONKSIYON_ICERIGI;
    }

    public ArrayList<String> getFONKSIYON_ICERIG_DEYIGSENLERI() {
        return FONKSIYON_ICERIG_DEYIGSENLERI;
    }

    public ArrayList<FonksiyonDeyisgenleri> getFONKSIYON_DEYISGENLERI(){
        return FONKSIYON_DEYISGENLERI;    
    }

    public int getFonksiyon_ID() {
        return Fonksiyon_ID;
    }

    public int getFONKSIYON_ICERIG_DEYISGENLERININ_SAYI() {
        return FONKSIYON_ICERIG_DEYISGENLERININ_SAYI;
    }
    
    public int getFONKSIYON_UID(){
        return FONKSIYON_UID;
    }

    public boolean getGERI_DONDURUCU_DURUMU(){
        return GERI_DONDURUCU_DURUMU;
    }
}`
                            },
                            "Deyisgen.java": {
                                "type": "file",
                                "language": "java",
                                "path": "ACTKernal/src/main/java/Tehliledici/Tool/Deyisgen.java",
                                "description": "Değişken yönetimi",
                                "code": "// Deyisgen sınıfı"
                            }
                        }
                    }
                }
            },
            "backend": {
                "type": "folder",
                "children": {
                    "KodIsleyici.java": {
                        "type": "file",
                        "language": "java",
                        "path": "ACTKernal/src/main/java/backend/KodIsleyici.java",
                        "description": "Kod işleme ve analiz sınıfı",
                        "code": `package backend;

import GUI.IDE.IDE;

/**
 * Kod İşleyici Sınıfı
 * @author mehemmed
 */
public class KodIsleyici {
    
    private String DosyaAdi;
    private String DosyaYolu;
    private int ID;
    
    public KodIsleyici(){
        // Constructor
    }
    
    public void MelumatYaz(String MELUMAT, int in){
        IDE.SCP[in].Yazdir(MELUMAT);
    }
    
    public String MelumatAl(int in){
        return IDE.SCP[in].MelumatAL();
    }
    
    public void KIQur(){
        IDE.KI[IDE.SAYACKI] = this;
        IDE.SAYACKI++;
    }
    
    public void getPANEL(){
        IDE.SCP[IDE.SAYACSCP] = (OzelJSCroll) new OzelJSCroll(IDE.keyboard).OzelJSCroll();
    }

    public void setDosyaAdi(String DosyaAdi) { 
        this.DosyaAdi = DosyaAdi; 
    }

    public void setDosyaYolu(String DosyaYolu) { 
        this.DosyaYolu = DosyaYolu; 
    }

    public void setID(int ID) { 
        this.ID = ID; 
    }

    public String getDosyaAdi() { 
        return DosyaAdi; 
    }

    public String getDosyaYolu() { 
        return DosyaYolu; 
    }

    public int getID() { 
        return ID; 
    }
}`
                    },
                    "Translater.java": {
                        "type": "file",
                        "language": "java",
                        "path": "ACTKernal/src/main/java/backend/Translater.java",
                        "description": "Çoklu dil desteği için çeviri sınıfı",
                        "code": `package backend;

import GUI.IDE.BackEnd.IdeBE;

public class Translater {
    public static String Translater(String EN, String AZ){
       
       if(IdeBE.IDELD.replaceAll("\\\\s", "").equals("English")){ 
           return EN; 
       }
       else if(IdeBE.IDELD.replaceAll("\\\\s", "").equals("Azerbaijan")){ 
           return AZ; 
       }
       return IdeBE.IDELD;
    }
}`
                    }
                }
            }
        }
    },
    "AndroidVersion": {
        "name": "Android IDE",
        "version": "1.0",
        "type": "Android Application",
        "structure": {
            "app": {
                "type": "folder",
                "children": {
                    "MainActivity.java": {
                        "type": "file",
                        "language": "java",
                        "path": "AndroidVersion/ACIDEAndroid/app/src/main/java/com/ACT/Android/MainActivity.java",
                        "description": "Android uygulamasının ana aktivitesi",
                        "code": `package com.ACT.Android;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.TextView;
import com.ACT.Android.Tehliledici.ACTehliledici;
import com.ACT.Android.Backend.FirebaseManager;
import com.ACT.Android.BlockChainACEcoSystem.BlockChain;

public class MainActivity extends Activity {
    
    public static EditText editText;
    public static TextView txv, txv2;
    public static TextView ShowTextView;
    public static ACTehliledici actehliledici;
    public static FileManager fm;
    private FirebaseManager firebaseManager;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        // Initialize components
        editText = findViewById(R.id.editText);
        txv = findViewById(R.id.txv);
        
        actehliledici = new ACTehliledici();
        fm = new FileManager(this);
        firebaseManager = new FirebaseManager();
        
        // Setup file manager
        fm.setupFileManager();
    }
    
    // ... diğer metodlar ...
}`
                    },
                    "FileManager.java": {
                        "type": "file",
                        "language": "java",
                        "path": "AndroidVersion/ACIDEAndroid/app/src/main/java/com/ACT/Android/FileManager.java",
                        "description": "Android dosya yönetim sistemi",
                        "code": "// FileManager sınıfı"
                    }
                }
            },
            "KBIR": {
                "type": "folder",
                "children": {
                    "main.py": {
                        "type": "file",
                        "language": "python",
                        "path": "AndroidVersion/ACIDEAndroid/KBIR/main.py",
                        "description": "AC kodunu yorumlayan Python tabanlı interpreter",
                        "code": `from interpreter import ACInterpreter
from lexer import ACLexer
from parser import ACParser
from tokens import TokenType
from errors import ACError
import sys
import os

class KBIR:
    def __init__(self):
        # Temel bileşenleri başlat
        self.lexer = ACLexer()
        self.parser = ACParser()
        self.interpreter = ACInterpreter()

        # Kapsam yönetimi
        self.global_scope = {}  # Global kapsam
        self.temp_scopes = {}   # Geçici kapsamlar
        self.current_scope = self.global_scope
        
        # Blok yönetimi
        self.current_block = []  # Aktif blok içeriği
        self.is_block_mode = False  # Blok modu aktif mi?
        self.block_content = []  # Tüm blok içeriği

        # Windows için konsol encoding ayarı
        if sys.platform == 'win32':
            sys.stdout.reconfigure(encoding='utf-8')
            sys.stdin.reconfigure(encoding='utf-8')

    def execute_code(self, code, is_repl=False):
        """Kodu çalıştır"""
        try:
            # Boş kod kontrolü
            if not code.strip():
                return None

            # Blok başlangıcı kontrolü
            if code.strip().startswith('baslanqic'):
                if self.is_block_mode:
                    raise SyntaxError("İç içe blok tanımlanamaz")
                self.is_block_mode = True
                self.current_block = []
                return None

            # Blok sonu kontrolü
            if code.strip() == 'son':
                if not self.is_block_mode:
                    raise SyntaxError("Blok başlamadan 'son' kullanılamaz")
                if not self.current_block:
                    raise SyntaxError("Boş blok tanımlanamaz")
                
                # Blok içeriğini çalıştır
                full_code = '\\n'.join(self.current_block)
                tokens = self.lexer.tokenize(full_code)
                filtered_tokens = [t for t in tokens if t.type not in (TokenType.START, TokenType.END)]
                
                try:
                    ast = self.parser.parse(filtered_tokens, source_code=full_code)
                    result = self.interpreter.interpret(ast)
                    self.is_block_mode = False
                    self.current_block = []
                    return result
                except Exception as e:
                    raise SyntaxError(f"Blok içinde hata: {str(e)}")

            # Blok modu aktifse kodu biriktir
            if self.is_block_mode:
                self.current_block.append(code)
                return None

            # Normal mod - kod analizi ve çalıştırma
            try:
                tokens = self.lexer.tokenize(code)
                
                # Temel sözdizimi kontrolü
                if not tokens:
                    raise SyntaxError("Boş veya geçersiz ifade")

                # ... diğer işlemler ...
                
            except ACError as e:
                raise SyntaxError(str(e))
                
        except Exception as e:
            raise SyntaxError(f"Hata: {str(e)}")
        
        return None

if __name__ == "__main__":
    kbir = KBIR()
    # REPL veya dosya işleme
`
                    },
                    "lexer.py": {
                        "type": "file",
                        "language": "python",
                        "path": "AndroidVersion/ACIDEAndroid/KBIR/lexer.py",
                        "description": "Token analizi ve lexer",
                        "code": `from tokens import Token, TokenType
from errors import LexerError

class ACLexer:
    def __init__(self):
        self.line = 1
        self.column = 1
        self.source = ""
        self.current = 0
        self.keywords = {
            'yazdir': TokenType.PRINT,
            'baslanqic': TokenType.START,
            'son': TokenType.END,
            'reqem': TokenType.INTEGER,
            'herif': TokenType.STRING,
            'dif': TokenType.IF,
            'eksedif': TokenType.ELIF,
            'eks': TokenType.ELSE,
            'ustglobal': TokenType.GLOBAL,
            'fonksiyon': TokenType.FUNCTION,
            'geri': TokenType.RETURN,
            'imp': TokenType.IMPORT,
            'sinif': TokenType.CLASS,
            'yeni': TokenType.NEW,
            'bu': TokenType.THIS,
            'miras': TokenType.EXTENDS,
            'acik': TokenType.PUBLIC,
            'gizli': TokenType.PRIVATE,
            'korumali': TokenType.PROTECTED,
            'sabit': TokenType.STATIC
        }

    def raise_error(self, message):
        """Hata fırlatma metodu"""
        code_snippet = None
        if self.source:
            lines = self.source.split('\\n')
            if 0 <= self.line - 1 < len(lines):
                code_snippet = lines[self.line - 1].strip()

        raise LexerError(
            message,
            line=self.line,
            column=self.column,
            code_snippet=code_snippet
        )

    def tokenize(self, source):
        self.source = source
        self.current = 0
        self.line = 1
        self.column = 1
        tokens = []

        while self.current < len(self.source):
            char = self.source[self.current]
            
            # Boşlukları atla
            if char.isspace():
                if char == '\\n':
                    self.line += 1
                    self.column = 1
                else:
                    self.column += 1
                self.current += 1
                continue
                
            # Yorumları atla
            if char == '#':
                while self.current < len(self.source) and self.source[self.current] != '\\n':
                    self.current += 1
                continue

            # Sayılar
            if char.isdigit():
                number = self.read_number()
                tokens.append(Token(TokenType.NUMBER, number, self.line, self.column))
                continue

            # Tanımlayıcılar ve anahtar kelimeler  
            if char.isalpha() or char == '_':
                identifier = self.read_identifier()
                token_type = self.keywords.get(identifier, TokenType.IDENTIFIER)
                tokens.append(Token(token_type, identifier, self.line, self.column))
                continue

            # Operatörler ve ayraçlar
            if char in '+-*/%(){}[],:=<>!.':
                token = self.read_operator()
                tokens.append(token)
                continue

            # String literalleri
            if char == '"':
                string = self.read_string()
                tokens.append(Token(TokenType.STRING_LITERAL, string, self.line, self.column))
                continue
                
            self.raise_error(f"Beklenmeyen karakter: {char}")

        tokens.append(Token(TokenType.EOF, None, self.line, self.column))
        return tokens

    def read_number(self):
        """Sayı okuma"""
        start = self.current
        while self.current < len(self.source) and self.source[self.current].isdigit():
            self.current += 1
            self.column += 1
        return int(self.source[start:self.current])

    def read_identifier(self):
        """Tanımlayıcı okuma"""
        start = self.current
        while self.current < len(self.source) and (self.source[self.current].isalnum() or self.source[self.current] == '_'):
            self.current += 1
            self.column += 1
        return self.source[start:self.current]

    def read_string(self):
        """String okuma"""
        self.current += 1  # " karakterini atla
        self.column += 1
        start = self.current
        while self.current < len(self.source) and self.source[self.current] != '"':
            if self.source[self.current] == '\\n':
                self.line += 1
                self.column = 1
            else:
                self.column += 1
            self.current += 1
        if self.current >= len(self.source):
            self.raise_error("String kapatılmadı")
        result = self.source[start:self.current]
        self.current += 1  # " karakterini atla
        self.column += 1
        return result

    def read_operator(self):
        """Operatör okuma"""
        char = self.source[self.current]
        self.current += 1
        self.column += 1
        
        # Çift karakterli operatörler
        if self.current < len(self.source):
            two_char = char + self.source[self.current]
            if two_char in ['==', '!=', '<=', '>=', '&&', '||']:
                self.current += 1
                self.column += 1
                return Token(TokenType.OPERATOR, two_char, self.line, self.column - 2)
        
        # Tek karakterli operatörler
        operator_map = {
            '+': TokenType.PLUS,
            '-': TokenType.MINUS,
            '*': TokenType.MULTIPLY,
            '/': TokenType.DIVIDE,
            '%': TokenType.MODULO,
            '=': TokenType.ASSIGN,
            '<': TokenType.LESS_THAN,
            '>': TokenType.GREATER_THAN,
            '!': TokenType.NOT,
            '(': TokenType.LPAREN,
            ')': TokenType.RPAREN,
            '{': TokenType.LBRACE,
            '}': TokenType.RBRACE,
            '[': TokenType.LBRACKET,
            ']': TokenType.RBRACKET,
            ',': TokenType.COMMA,
            ':': TokenType.COLON,
            '.': TokenType.DOT
        }
        
        return Token(operator_map.get(char, TokenType.OPERATOR), char, self.line, self.column - 1)`
                    },
                    "parser.py": {
                        "type": "file",
                        "language": "python",
                        "path": "AndroidVersion/ACIDEAndroid/KBIR/parser.py",
                        "description": "Syntax analizi ve parser",
                        "code": "// Parser sınıfı"
                    },
                    "interpreter.py": {
                        "type": "file",
                        "language": "python",
                        "path": "AndroidVersion/ACIDEAndroid/KBIR/interpreter.py",
                        "description": "Kod yorumlama motoru",
                        "code": "// Interpreter sınıfı"
                    },
                    "version.py": {
                        "type": "file",
                        "language": "python",
                        "path": "AndroidVersion/ACIDEAndroid/KBIR/version.py",
                        "description": "Versiyon bilgisi",
                        "code": `VERSION = "1.1.0"
RELEASE_DATE = "2024-03-15"`
                    }
                }
            }
        }
    }
};

